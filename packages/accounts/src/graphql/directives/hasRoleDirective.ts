import { SchemaDirectiveVisitor } from 'graphql-tools';
import { DirectiveLocation, GraphQLDirective, GraphQLList, GraphQLString } from 'graphql';
import { AuthorizationError } from './errors';
import { decodeToken } from './decodeToken';

// original code: https://github.com/grand-stack/graphql-auth-directives

export class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role')),
          defaultValue: 'reader',
        },
      },
    });
  }

  visitFieldDefinition(field) {
    const expectedRoles = this.args.roles;
    const next = field.resolve;

    field.resolve = function(result, args, context, info) {
      const decoded = decodeToken({ context });

      const roles =
        decoded['roles'] || decoded['role'] || decoded['Role'] || decoded['Roles'] || [];

      if (expectedRoles.some((role) => roles.indexOf(role) !== -1)) {
        return next(result, args, context, info);
      }

      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      });
    };
  }

  visitObject(obj) {
    const fields = obj.getFields();
    const expectedRoles = this.args.roles;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const next = field.resolve;
      field.resolve = function(result, args, context, info) {
        const decoded = decodeToken({ context });

        const roles = process.env.AUTH_DIRECTIVES_ROLE_KEY
          ? decoded[process.env.AUTH_DIRECTIVES_ROLE_KEY] || []
          : decoded['Roles'] || decoded['roles'] || decoded['Role'] || decoded['role'] || [];

        if (expectedRoles.some((role) => roles.indexOf(role) !== -1)) {
          return next(result, args, context, info);
        }
        throw new AuthorizationError({
          message: 'You are not authorized for this resource',
        });
      };
    });
  }
}
