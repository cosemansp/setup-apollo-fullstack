import { SchemaDirectiveVisitor } from 'graphql-tools';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { decodeToken } from './decodeToken';

// original code: https://github.com/grand-stack/graphql-auth-directives

export class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'isAuthenticated',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
    });
  }

  visitObject(obj) {
    const fields = obj.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const next = field.resolve;

      field.resolve = function(result, args, context, info) {
        decodeToken({ context }); // will throw error if not valid signed jwt
        return next(result, args, context, info);
      };
    });
  }

  visitFieldDefinition(field) {
    const next = field.resolve;

    field.resolve = function(result, args, context, info) {
      decodeToken({ context });
      return next(result, args, context, info);
    };
  }
}
