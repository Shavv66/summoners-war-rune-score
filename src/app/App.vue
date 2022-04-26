<script setup lang="ts">
	import { ref } from "vue";

	const count = ref(0);

	function increment() {
		count.value++;
	}
</script>

<template>
	<h3>
		Count is {{ count }}
	</h3>
	<button @click="increment">Clicky</button>
</template>
