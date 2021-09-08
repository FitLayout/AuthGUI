<template>
	<div class="view-users">

	<h1>User administration</h1>
	<div class="user-list">
		<DataTable :value="users" editMode="row" dataKey="username" v-model:editingRows="editingRows"
                @rowEditInit="onRowEditInit" @rowEditSave="onRowEditSave" @rowEditCancel="onRowEditCancel" responsiveLayout="scroll">
			<Column field="username" header="User ID"></Column>
			<Column field="name" header="Name">
				<template #editor="slotProps">
					<InputText v-model="slotProps.data[slotProps.column.props.field]" autofocus />
				</template>			
			</Column>
			<Column field="email" header="E-mail">
				<template #editor="slotProps">
					<InputText v-model="slotProps.data[slotProps.column.props.field]" autofocus />
				</template>			
			</Column>
			<Column field="roles" header="Roles">
				<template #editor="slotProps">
				 	<div class="p-field-checkbox">
						<Checkbox id="user" name="user" value="user" v-model="slotProps.data[slotProps.column.props.field]" />
						<label for="user">user</label>
					</div>
				 	<div class="p-field-checkbox">
						<Checkbox id="admin" name="admin" value="admin" v-model="slotProps.data[slotProps.column.props.field]" />
						<label for="admin">admin</label>
					</div>
				</template>			
			</Column>
			<Column :rowEditor="true" style="width: 10%; min-width:8rem" bodyStyle="text-align:center"></Column>			
		</DataTable>
	</div>

	</div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

export default {
	name: 'home',
	components: {
		DataTable,
		Column,
		InputText,
		Checkbox
	},
	//inject: ['apiClient'],
	data() {
		return {
			apiClient: null,
			users: [],
			editingRows: []
		}
	},
	originalRows: null,
	created () {
		this.apiClient = this.$root.apiClient;
		this.originalRows = {};
	},
	mounted() {
        this.apiClient.getUsers().then(data => this.users = data);
    },	
	methods: {
		onRowEditInit(event) {
            this.originalRows[event.index] = {...this.users[event.index]};
		},
        onRowEditSave(event) {
			const userdata = this.users[event.index];
			this.apiClient.updateUser(userdata);
        },
        onRowEditCancel(event) {
            this.users[event.index] = this.originalRows[event.index];
        }
	}
}
</script>

<style>
.view-users {
	margin: 2em;
}
</style>
