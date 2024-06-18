# Group usage

Drag and drop between groups

**Key Code**
```vue
<virtual-list
  ...
  :group="group"
>
  ...
</virtual-list>
<script setup>
  const group = reactive({
    name: 'name',
    pull: true,
    put: true,
  });
</script>
```

<preview path="../components/group.vue" />
