<template>
	<div>
		<v-container>
			<Appbar />
			<Sidebar />
		</v-container>
	</div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Appbar from "@/components/Appbar";
export default {
	components: {
		Sidebar,
		Appbar
	},
	data() {
		return {
			drawer: true
		};
	}
};
</script>
