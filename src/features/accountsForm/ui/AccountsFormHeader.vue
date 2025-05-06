<script setup lang="ts">
import { TEXT } from '@/shared/config/text';
</script>
<template>
	<div class="grid grid-cols-[repeat(11,1fr)] gap-3 items-start mb-4">
		<div class="col-span-3">{{ TEXT.rows.labels }}</div>
		<div class="col-span-2">{{ TEXT.rows.type }}</div>
		<div class="col-span-3">{{ TEXT.rows.login }}</div>
		<div class="col-span-3">{{ TEXT.rows.password }}</div>
	</div>
</template>
