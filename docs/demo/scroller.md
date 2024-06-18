# Customize scroller

This Demo uses `scroller: document`

**Key Code**
```vue
<virtual-list
  ...
  :scroller="scroller"
>
  ...
</virtual-list>
<script setup>
  const scroller = ref(document);
</script>
```

<preview path="../components/scroller.vue" />
