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

const { values, typeOptions, remove, errors, onBlur } = useAccountFormRow(account);
const isShowPassword = computed(() => values.type === AccountType.local);
</script>
<template>
	<div class="grid grid-cols-[repeat(11,1fr)] gap-3">
		<Input
			class="col-span-3"
			v-model="values.labels"
			:placeholder="TEXT.placeholders.labels"
			:error="!!errors.labels"
			@blur="onBlur"
		/>

		<Select v-model="values.type">
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
			:error="!!errors.login"
			@blur="onBlur"
		/>

		<Input
			class="col-span-2"
			v-if="isShowPassword"
			type="password"
			v-model="values.password"
			:placeholder="TEXT.placeholders.password"
      :error="!!errors.password"
			@blur="onBlur"
		/>

		<Button
			class="text-red-500 col-span-1 justify-self-end"
			variant="ghost"
			size="icon"
			@click="remove"
		>
			<ShoppingBasket />
		</Button>
	</div>
</template>
