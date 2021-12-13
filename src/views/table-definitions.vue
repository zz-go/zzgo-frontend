<template>
  <div v-loading="loading" class="content">
    <div class="content__inner">
      <p class="subline">Overview</p>
      <h1 class="h1">Table Definitions</h1>
    </div>

    <el-table :data="tabledefinitions" style="width: 100%">
      <el-table-column label="Name">
        <template #default="scope">
          <span class="ellipsis">{{
            tabledefinitions[scope.$index].attributes.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Fieldcount" width="140">
        <template #default="scope">
          <span
            >{{
              tabledefinitions[scope.$index].relationships.hasOwnProperty(
                "sys-db-field-definitions"
              )
                ? tabledefinitions[scope.$index].relationships[
                    "sys-db-field-definitions"
                  ].data.length
                : "0"
            }}
            Field<span
              v-if="
                (tabledefinitions[scope.$index].relationships.hasOwnProperty(
                  'sys-db-field-definitions'
                ) &&
                  tabledefinitions[scope.$index].relationships[
                    'sys-db-field-definitions'
                  ].data.length != 1) ||
                !tabledefinitions[scope.$index].relationships.hasOwnProperty(
                  'sys-db-field-definitions'
                )
              "
              >s</span
            ></span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="Soft Deletes"
        class-name="text-center"
        width="140"
      >
        <template #default="scope">
          <el-switch
            v-model="tabledefinitions[scope.$index].attributes.use_soft_deletes"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="updateItem(scope.$index, 'use_soft_deletes')"
          />
        </template>
      </el-table-column>
      <el-table-column label="Timestamps" class-name="text-center" width="140">
        <template #default="scope">
          <el-switch
            v-model="tabledefinitions[scope.$index].attributes.use_timestamps"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="updateItem(scope.$index, 'use_timestamps')"
          />
        </template>
      </el-table-column>
      <el-table-column label="Created" width="200">
        <template #default="scope">
          {{
            format_date(tabledefinitions[scope.$index].attributes.created_at)
          }}
        </template>
      </el-table-column>
      <el-table-column label="Updated" width="200">
        <template #default="scope">
          {{
            format_date(tabledefinitions[scope.$index].attributes.updated_at)
          }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="&nbsp;" width="190">
        <template #default="scope">
          <el-button
            size="mini"
            @click="gotoItem(tabledefinitions[scope.$index].id)"
          >
            Edit Fields
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteItem(tabledefinitions[scope.$index].id, scope.$index)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="content__addLine">
      <el-button type="primary" size="mini" v-on:click="addTable()"
        >Add</el-button
      >
    </div>
  </div>
</template>

<script>
import * as api from "../api";
import dateMixin from "@/mixins/dateMixin.js";
import router from "../router";
import { mapGetters } from "vuex";

import { ElMessageBox } from "element-plus";

export default {
  mixins: [dateMixin],
  name: "Table Definitions",
  computed: {
    ...mapGetters(["tabledefinitions"]),
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.fetchDefinitions();
  },
  methods: {
    gotoItem(id) {
      router.push({ path: "/table-definitions/" + id });
    },

    addTable() {
      ElMessageBox.prompt("Set the name for the new table:", "New Table", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      })
        .then(({ value }) => {
          if (value !== null) {
            this.createTable(value);
          }
        })
        .catch(() => {
          console.log("do nothing");
        });
    },

    async updateItem(index, key) {
      this.loading = true;
      try {
        await api.tabledefinitions.updateTable(
          this.tabledefinitions[index].id,
          this.tabledefinitions[index].attributes[key]
        );
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },

    async deleteItem(id, index) {
      this.loading = true;
      try {
        await api.tabledefinitions.deleteTable(id);
        this.tabledefinitions.splice(index, 1);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },

    async createTable(value) {
      this.loading = true;
      try {
        let response = await api.tabledefinitions.createTable(value);
        response.data.data.relationships.data = new Array();
        this.tabledefinitions.push(response.data.data);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },

    async fetchDefinitions() {
      let that = this;
      that.loading = true;

      this.$store.dispatch("fetchTabledefinitions").then(() => {
        that.loading = false;
      });
    },
  },
};
</script>
