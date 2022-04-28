---
to: src/<%= name %>/resolvers/<%= name %>.field.resolver.ts
---
import { Resolver } from '@nestjs/graphql';
import { <%= h.capitalize(singular) %>Model } from '../models/<%= h.inflection.singularize( name ) %>.model';

@Resolver(() => <%= h.capitalize(singular) %>Model)
export class <%= h.capitalize(name) %>FieldResolver {}
