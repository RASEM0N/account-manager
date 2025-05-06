<script lang="ts" setup>
import { useAccountStore } from '@/entites/account';
import { Plus, CircleHelp } from 'lucide-vue-next';
import { Button } from '@/shared/ui/button';
import AccountFormRow from './AccountFormRow.vue';
import AccountsFormHeader from './AccountsFormHeader.vue';
import { TEXT } from '@/shared/config/text';

const store = useAccountStore();
</script>
<template>
	<section>
		<div class="flex align-center mb-10">
			<h1 class="text-3xl font-bold mr-2">{{ TEXT.title }}</h1>
			<Button variant="outline" size="icon" @click="store.add()">
				<Plus />
			</Button>
		</div>
		<div class="mb-4 p-2 bg-input flex gap-2 items-center rounded-sm">
			<CircleHelp class="shrink-0" />
			<span>{{ TEXT.description }} <b>;</b></span>
		</div>
		<div class="space-y-3">
			<AccountsFormHeader />
			<AccountFormRow v-for="acc in store.accounts" :key="acc.id" :account="acc" />
		</div>
	</section>
</template>
