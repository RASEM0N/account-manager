<script lang="ts" setup>
import { useAccountStore } from '@/entites/account';
import { Plus } from 'lucide-vue-next';
import { Button } from '@/shared/ui/button';
import AccountFormRow from './AccountFormRow.vue';
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
    <div class="grid grid-cols-[repeat(11,1fr)] gap-3 items-start mb-4">
      <div class="col-span-3">{{ TEXT.rows.labels }}</div>
      <div class="col-span-2">{{ TEXT.rows.type }}</div>
      <div class="col-span-3">{{ TEXT.rows.login }}</div>
      <div class="col-span-3">{{ TEXT.rows.password }}</div>
    </div>
		<div class="space-y-3">
			<AccountFormRow v-for="acc in store.accounts" :key="acc.id" :account="acc" />
		</div>
	</section>
</template>
