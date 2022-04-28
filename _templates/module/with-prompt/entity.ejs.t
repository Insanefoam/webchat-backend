---
to: src/<%= name %>/entities/<%= h.inflection.singularize( name ) %>.entity.ts
---
<% singular = h.inflection.singularize( name ) %>
import { BaseUUIDEntity } from 'src/common/entities/base-uuid.entity';

export class <%= h.capitalize(singular) %>Entity extends BaseUUIDEntity {
  static tableName = '<%= name %>';
}
