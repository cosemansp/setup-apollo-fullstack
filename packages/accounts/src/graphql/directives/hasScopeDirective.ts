import { SchemaDirectiveVisitor } from 'graphql-tools';
import { DirectiveLocation, GraphQLDirective, GraphQLList, GraphQLString } from 'graphql';
import { AuthorizationError } from './errors';
import { decodeToken } from './decodeToken';

// original code: https://github.com/grand-stack/graphql-auth-directives

export class HasScopeDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasScope',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
      args: {
        scopes: {
          type: new GraphQLList(GraphQLString),
          defaultValue: 'none:read',
        },
      },
    });
  }

  // used for example, with Query and Mutation fields
  visitFieldDefinition(field) {
    const expectedScopes = this.args.scopes;
    const next = field.resolve;

    // wrap resolver with auth check
    field.resolve = function(result, args, context, info) {
      const decoded = decodeToken({ context });
      const scopes =
        decoded['Scopes'] || decoded['scopes'] || decoded['Scope'] || decoded['scope'] || [];

      if (expectedScopes.some((scope) => scopes.indexOf(scope) !== -1)) {
        return next(result, args, context, info);
      }

      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      });
    };
  }

  visitObject(obj) {
    const fields = obj.getFields();
    const expectedScopes = this.args.roles;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const next = field.resolve;
      field.resolve = function(result, args, context, info) {
        const decoded = decodeToken({ context });

        const scopes =
          decoded['scopes'] || decoded['scope'] || decoded['Scope'] || decoded['Scopes'] || [];

        if (expectedScopes.some((role) => scopes.indexOf(role) !== -1)) {
          return next(result, args, context, info);
        }
        throw new AuthorizationError({
          message: 'You are not authorized for this resource',
        });
      };
    });
  }
}
