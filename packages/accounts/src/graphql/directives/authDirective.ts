import { SchemaDirectiveVisitor } from 'graphql-tools';
import { DirectiveLocation, GraphQLDirective, GraphQLList, GraphQLString } from 'graphql';
import { AuthorizationError } from '../errors';

const isAuthenticated = (context: any) => {
  const tokenPayload = context.tokenPayload || context.user;
  return !!tokenPayload;
};

const hasRole = (context: any, expected: string[]) => {
  if (!expected || !expected.length) return false;
  const tokenPayload = context.tokenPayload || context.user;
  const roles =
    tokenPayload['roles'] ||
    tokenPayload['role'] ||
    tokenPayload['Role'] ||
    tokenPayload['Roles'] ||
    [];
  return expected.some((role) => roles.indexOf(role) !== -1);
};

const hasScope = (context: any, expected: string[]) => {
  if (!expected || !expected.length) return false;
  const tokenPayload = context.tokenPayload || context.user;
  const roles =
    tokenPayload['scopes'] ||
    tokenPayload['scope'] ||
    tokenPayload['Scope'] ||
    tokenPayload['Scopes'] ||
    [];
  return expected.some((role) => roles.indexOf(role) !== -1);
};

export class AuthDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
      args: {
        scopes: {
          type: new GraphQLList(GraphQLString),
          defaultValue: ['none:read'],
        },
        roles: {
          type: new GraphQLList(schema.getType('Role')),
          defaultValue: ['reader'],
        },
      },
    });
  }

  // used for example, with Query and Mutation fields
  visitFieldDefinition(field) {
    const expectedScopes = this.args.scopes;
    const expectedRoles = this.args.roles;
    const next = field.resolve;

    field.resolve = (result, args, context, info) => {
      if (expectedRoles && hasRole(context, expectedRoles)) {
        return next(result, args, context, info);
      }
      if (expectedScopes && hasScope(context, expectedScopes)) {
        return next(result, args, context, info);
      }
      if (!expectedRoles && !expectedScopes && isAuthenticated(context)) {
        return next(result, args, context, info);
      }
      throw new AuthorizationError({
        message: 'You are not authorized for this resource',
      });
    };
  }

  visitObject(obj) {
    const fields = obj.getFields();
    const expectedScopes = this.args.scopes;
    const expectedRoles = this.args.roles;

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const next = field.resolve;
      field.resolve = (result, args, context, info) => {
        if (expectedRoles && hasRole(context, expectedRoles)) {
          return next(result, args, context, info);
        }
        if (expectedScopes && hasScope(context, expectedScopes)) {
          return next(result, args, context, info);
        }
        if (!expectedRoles && !expectedScopes && isAuthenticated(context)) {
          return next(result, args, context, info);
        }
        throw new AuthorizationError({
          message: 'You are not authorized for this resource',
        });
      };
    });
  }
}
