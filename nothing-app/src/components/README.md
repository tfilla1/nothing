# Components

Vue template files in this folder are automatically imported.

## 🚀 Usage

Importing is handled by [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components). This plugin automatically imports `.vue` files created in the `src/components` directory, and registers them as global components. This means that you can use any component in your application without having to manually import it.

The following example assumes a component located at `src/components/MyComponent.vue`:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  //
</script>
```

When your template is rendered, the component's import will automatically be inlined, which renders to this:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  import MyComponent from '@/components/MyComponent.vue'
</script>
```

# SearchWithChips Component

A reusable, framework-agnostic component for filtering lists using a search input and dynamic filter chips. Perfect for when your users want to feel like data-wrangling wizards.

## Features

- Accepts a freeform query and converts it into filter chips (e.g., `username:alice`)
- Supports multiple filter fields and custom filter logic
- Dynamically filters a list of items based on active chips
- Chips are removable (because mistakes happen)
- Returns the filtered list for easy integration

## Props

- **query** (`string`): The current value of the search input
- **chips** (`Array<{field: string, value: string}>`): List of active filter chips
- **items** (`Array<Object>`): The list of items to filter (e.g., users)
- **filters** (`Object`): Map of field names to filter functions, e.g., `{ username: (item, value) => item.username.includes(value) }`

## Usage

```js
<SearchWithChips
  query={query}
  chips={chips}
  items={users}
  filters={{
    username: (user, val) => user.username.includes(val),
    email: (user, val) => user.email.includes(val),
    location: (user, val) => user.location.includes(val),
  }}
/>
```

## How It Works

1. User types in a search term like `username:alice` and hits Enter.
2. The component turns this into a chip: `username: alice`.
3. Each chip is applied as a filter to the items list using the provided filter functions.
4. The filtered list is rendered below the chips.
5. Users can remove chips at any time to broaden their search (or fix a typo).

## Example

Say you have a user list:

```js
const users = [
  { username: 'alice', email: 'alice@email.com', location: 'Wonderland' },
  { username: 'bob', email: 'bob@email.com', location: 'Builderland' },
];
```

And you want to filter by username or location. Just add chips like `username:alice` or `location:Builderland` and watch the magic happen.

## Why Use This?

Because your users deserve better than a boring, one-dimensional search box. Give them the power of chips, and they’ll never go back.

## License

MIT. Use it, break it, improve it, send us a postcard.

# quick-switch

Component: quick-switch.vue

- Define 4 menu items, each with icon, label, and onClick handler

- Render a container (e.g., `<div class="menu-square">`)
  - Use CSS grid to arrange children in 2 columns, 2 rows

  - For each menu item:
    - Render a button or clickable div
    - Show icon and label

- Style:
  - .menu-square: display as grid, grid-template-columns: repeat(2, 1fr)
  - Each item: center content, add padding, hover effect

- Export component

Usage:

- In AppBar component, append `<quick-switch />` to the right/append slot
