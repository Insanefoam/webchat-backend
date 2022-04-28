---
to: src/<%= name %>/resolvers/<%= name %>.mutation.resolver.ts
---
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class <%= h.capitalize(name) %>MutationResolver {}
