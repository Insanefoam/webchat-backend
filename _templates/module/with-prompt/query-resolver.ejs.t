---
to: src/<%= name %>/resolvers/<%= name %>.query.resolver.ts
---
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class <%= h.capitalize(name) %>QueryResolver {}
