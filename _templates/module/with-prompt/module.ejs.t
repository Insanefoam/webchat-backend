---
to: src/<%= name %>/<%= name %>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.capitalize(name) %>Service } from './services/<%= name %>.service';
import { <%= h.capitalize(name) %>QueryResolver } from './resolvers/<%= name %>.query.resolver';
import { <%= h.capitalize(name) %>MutationResolver } from './resolvers/<%= name %>.mutation.resolver';
import { <%= h.capitalize(name) %>FieldResolver } from './resolvers/<%= name %>.field.resolver';

@Module({
  providers: [<%= h.capitalize(name) %>QueryResolver, <%= h.capitalize(name) %>MutationResolver, <%= h.capitalize(name) %>FieldResolver, <%= h.capitalize(name) %>Service],
})
export class <%= Name %>Module {}
