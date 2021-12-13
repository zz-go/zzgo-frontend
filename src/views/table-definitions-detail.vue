<template>
  <div v-loading="loading" class="content">
    <div class="content__inner">
      <p class="subline">Table definition</p>
      <h1 class="h1">
        <span v-if="tabledefinition !== false">{{
          tabledefinition.attributes.name
        }}</span
        >&nbsp;
      </h1>
    </div>

    <div class="tabs">
      <router-link
        class="tabs__item"
        @click="relations = false"
        :class="{ active: relations === false }"
        :to="'/table-definitions/' + id"
        >Edit Fields</router-link
      >
      <router-link
        class="tabs__item"
        @click="relations = true"
        :class="{ active: relations === true }"
        :to="'/table-definitions/' + id + '/relations'"
        >Edit Relations</router-link
      >
    </div>

    <div v-if="relations === false && tabledefinition !== false">
      <el-table
        :data="tabledefinition.relationships['sys-db-field-definitions'].data"
        style="width: 100%"
      >
        <el-table-column label="Name">
          <template #default="scope">
            <el-input
              :class="{
                error:
                  tabledefinition.relationships[
                    'sys-db-field-definitions'
                  ].data[scope.$index].attributes.name.trim().length < 1,
              }"
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.name
              "
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="Type">
          <template #default="scope">
            <el-select
              style="width: 100%"
              :class="{
                error:
                  tabledefinition.relationships[
                    'sys-db-field-definitions'
                  ].data[scope.$index].attributes.type.trim().length < 1,
              }"
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.type
              "
              placeholder="Select Type"
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Default">
          <template #default="scope">
            <el-input
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.default
              "
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="Index">
          <template #default="scope">
            <el-input
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.index
              "
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="Nullable" class-name="text-center" width="120">
          <template #default="scope">
            <el-switch
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.nullable
              "
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="Unsigned" class-name="text-center" width="120">
          <template #default="scope">
            <el-switch
              v-if="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.type === 'integer'
              "
              v-model="
                tabledefinition.relationships['sys-db-field-definitions'].data[
                  scope.$index
                ].attributes.unsigned
              "
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="
                saveItem(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="" width="92">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click="
                triggerDelete(
                  tabledefinition.relationships['sys-db-field-definitions']
                    .data[scope.$index].id,
                  scope.$index
                )
              "
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="content__addLine">
        <el-button type="primary" size="mini" v-on:click="addField(1)"
          >Add</el-button
        >
        <el-button type="primary" size="mini" v-on:click="addField(addMultiple)"
          >Add Multiple</el-button
        >
        <el-input v-model="addMultiple" size="mini" />
      </div>
    </div>

    <div v-if="relations === true && tabledefinition !== false">
      alskfjalksdfj
    </div>
  </div>
</template>

<script>
import * as api from "../api";
import { ElMessageBox } from "element-plus";
import { mapGetters } from "vuex";

export default {
  name: "Table Definition",
  data() {
    return {
      id: 0,
      tabledefinition: false,
      loading: true,
      typeOptions: [
        {
          value: "string",
          label: "String",
        },
        {
          value: "integer",
          label: "Integer",
        },
        {
          value: "boolean",
          label: "Boolean",
        },
      ],
      addMultiple: 5,
      newIndex: [],
      relations: false,
    };
  },
  computed: {
    ...mapGetters(["tabledefinitions"]),
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchDefinition(this.id);

    if (this.tabledefinitions === false || this.tabledefinitions.length < 1)
      this.$store.dispatch("fetchTabledefinitions");

    if (this.$router.currentRoute._value.path.split("/").length > 3)
      this.relations = true;
  },
  methods: {
    async fetchDefinition(id) {
      try {
        const response = await api.tabledefinitions.get(id);
        this.tabledefinition = response.data.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    addField(count) {
      for (let i = 0; i < count; i++) {
        let newIndex = 0;
        do {
          newIndex = "new_" + Math.floor(Math.random() * 100000);
        } while (this.newIndex.indexOf(newIndex) >= 0 && newIndex !== 0);
        this.newIndex.push(newIndex);

        this.tabledefinition.relationships[
          "sys-db-field-definitions"
        ].data.push({
          attributes: {
            default: "",
            name: "",
            nullable: 0,
            unsigned: 0,
            type: "",
            index: "",
          },
          id: newIndex,
        });
      }
    },

    triggerDelete(id, index) {
      let that = this;
      ElMessageBox.confirm(
        "Do you really want to delete this field definition?",
        "Warning",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        }
      )
        .then(() => {
          that.deleteItem(id, index);
        })
        .catch(() => {
          console.log("do nothing");
        });
    },

    async deleteItem(id, index) {
      let that = this;
      try {
        const response = await api.tabledefinitions.delete(this.id, id);
        console.log(response);
        that.tabledefinition.relationships[
          "sys-db-field-definitions"
        ].data.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },

    async saveItem(id, index) {
      let that = this;

      var toSave = this.tabledefinition.relationships[
        "sys-db-field-definitions"
      ].data.filter((obj) => {
        return obj.id === id;
      });
      toSave = toSave[0];

      if (
        toSave.attributes.name.trim().length > 0 &&
        toSave.attributes.type.trim().length > 0
      ) {
        let operation = id.indexOf("new_") === 0 ? "create" : "update";

        try {
          const response = await api.tabledefinitions[operation](
            that.tabledefinition.id,
            toSave.id,
            toSave.attributes
          );
          that.tabledefinition.relationships["sys-db-field-definitions"].data[
            index
          ] = response.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.savecol {
  &__saved {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: $color-green;
  }
}
</style>
