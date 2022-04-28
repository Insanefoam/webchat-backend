---
to: src/<%= name %>/services/<%= name %>.service.ts
---
import { Injectable } from '@nestjs/common';

@Injectable()
export class <%= h.capitalize(name) %>Service {}
