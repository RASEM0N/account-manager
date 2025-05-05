<script lang="ts" setup>
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { ShoppingBasket } from 'lucide-vue-next';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
} from '@/shared/ui/select';
import { useAccountFormRow } from '../model/useAccountFormRow';
import { type Account, AccountType } from '@/entites/account';
import { TEXT } from '@/shared/config/text';
import { cn } from '@/shared/lib/cls';
import { computed } from 'vue';

const { account } = defineProps<{
	account: Account;
}>();

const { values, typeOptions, remove, errors, blur } = useAccountFormRow(account);
const isShowPassword = computed(() => values.type === AccountType.local);
</script>
<template>
	<div
		:class="
			cn(
				'grid grid-cols-[repeat(10,1fr)_auto] gap-3 items-start border rounded-lg p-4 place-items-end',
			)
		"
	>
		<Input
			class="col-span-3"
			v-model="values.labels"
			:placeholder="TEXT.placeholders.labels"
			:invalid="errors.labels"
			@blur="blur('labels')"
		/>

		<Select v-model="values.type" @blur="blur('type')">
			<SelectTrigger class="col-span-2 overflow-hidden w-full">
				<SelectValue :placeholder="TEXT.placeholders.type" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem
						v-for="opt in typeOptions"
						:key="opt.value"
						:value="opt.value"
					>
						{{ opt.label }}
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>

		<Input
			:class="
				cn({
					'col-span-3': isShowPassword,
					'col-span-5': !isShowPassword,
				})
			"
			v-model="values.login"
			:placeholder="TEXT.placeholders.login"
			:invalid="errors.login"
			@blur="blur('login')"
		/>

		<Input
			class="col-span-2"
			v-if="isShowPassword"
			type="password"
			v-model="values.password"
			:placeholder="TEXT.placeholders.password"
			:invalid="errors.password"
			@blur="blur('password')"
		/>

		<Button variant="ghost" size="icon" class="text-red-500" @click="remove">
			<ShoppingBasket />
		</Button>
	</div>
</template>
