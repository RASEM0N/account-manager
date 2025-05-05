<script lang="ts" setup>
import { TEXT } from '@/shared/config/text';
import { AccountsForm } from '@/features/accountsForm';
</script>
<template>
	<main class="p-6 max-w-3xl mx-auto space-y-6">
		<h1 class="text-3xl font-bold">{{ TEXT.title }}</h1>
		<AccountsForm />
	</main>
</template>
<style>
@import 'tailwindcss';
</style>
