---
to: src/<%= name %>/models/<%= h.inflection.singularize( name ) %>.model.ts
---
<% singular = h.inflection.singularize( name ) %>
import { Field, ObjectType } from '@nestjs/graphql';
import { <%= h.capitalize(singular) %>Entity } from '../entities/<%= singular %>.entity';

@ObjectType('<%= h.capitalize(singular) %>')
export class <%= h.capitalize(singular) %>Model {
  constructor(entity: <%= h.capitalize(singular) %>Entity) {
    Object.assign(this, entity);
  }

  @Field()
  id: string;

  static create(entity: <%= h.capitalize(singular) %>Entity): <%= h.capitalize(singular) %>Model;
  static create(entities: <%= h.capitalize(singular) %>Entity[]): <%= h.capitalize(singular) %>Model[];
  static create(
    entityOrEntities: <%= h.capitalize(singular) %>Entity | <%= h.capitalize(singular) %>Entity[],
  ): <%= h.capitalize(singular) %>Model | <%= h.capitalize(singular) %>Model[] {
    if (Array.isArray(entityOrEntities)) {
      return entityOrEntities.map<<%= h.capitalize(singular) %>Model>(<%= h.capitalize(singular) %>Model.create);
    }

    return new <%= h.capitalize(singular) %>Model(entityOrEntities);
  }
}
