<script setup lang="ts">
import { Refresh, Search } from "@element-plus/icons-vue";
import { formatUTC } from "@/utils/day";
import { useSystemUserStore } from "@/stores/main/system/user";
const systemUserStore = useSystemUserStore();
systemUserStore.getListAction();
systemUserStore.getEntireAction();
</script>

<template>
  <div class="user-box">
    <el-dialog
      v-model="systemUserStore.dialog.show"
      title="用户信息"
      width="30%"
      center
      :show-close="false"
    >
      <el-form v-model="systemUserStore.dialog.form">
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="systemUserStore.dialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="systemUserStore.dialog.form.realname"></el-input>
        </el-form-item>
        <el-form-item v-if="!systemUserStore.dialog.edit" label="登录密码" prop="password">
          <el-input v-model="systemUserStore.dialog.form.password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="cellphone">
          <el-input v-model="systemUserStore.dialog.form.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="systemUserStore.dialog.form.roleId">
            <template v-for="item in systemUserStore.entireRole.list" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentID">
          <el-select v-model="systemUserStore.dialog.form.departmentId">
            <template v-for="item in systemUserStore.entireDepartment.list" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="flex-box flex-center">
        <el-button @click="systemUserStore.noAddAction">取消</el-button>
        <el-button @click="systemUserStore.addAction">执行</el-button>
      </div>
    </el-dialog>
    <el-card>
      <template #header>
        <span>搜索</span>
      </template>
      <el-form :model="systemUserStore.searchForm">
        <el-row :gutter="24" justify="space-between">
          <el-col :span="8">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="systemUserStore.searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="systemUserStore.searchForm.realname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话号码" prop="cellphone">
              <el-input v-model="systemUserStore.searchForm.cellphone"></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="个人状态" prop="enable">
              <el-select v-model="systemUserStore.searchForm.enable" placeholder="选择查询状态">
                <el-option label="正常" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            ><el-form-item label="创建时间" prop="createAt">
              <el-date-picker
                v-model="systemUserStore.searchForm.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              /> </el-form-item
          ></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <div class="flex-box">
          <el-button :icon="Refresh" @click="systemUserStore.resetAction">重置</el-button>
          <el-button :icon="Search" @click="systemUserStore.getListAction">查询</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card>
      <template #header>
        <span>用户管理</span>
        <el-button @click="systemUserStore.clickAddAction">新建用户</el-button>
      </template>
      <el-table style="width: 100%" :data="systemUserStore.list">
        <el-table-column align="center" type="selection" width="100" />
        <el-table-column align="center" type="index" label="序号" width="100" />
        <el-table-column align="center" prop="id" label="id" sortable width="100"></el-table-column>
        <el-table-column align="center" prop="name" label="昵称" width="100"></el-table-column>
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="100"
        ></el-table-column>
        <el-table-column align="center" prop="cellphone" label="手机号码"></el-table-column>
        <el-table-column align="center" prop="departmentId" label="部门id"></el-table-column>
        <el-table-column align="center" prop="roleId" label="权限id"></el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间" sortable>
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间" sortable>
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="enable" label="状态" width="100" fixed="right">
          <template #default="scope">
            <el-button link>
              {{ scope.row.enable === 1 ? "正常" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button link @click="systemUserStore.deleteAction(scope.row.id)">删除</el-button>
            <el-button link @click="systemUserStore.clickEditAction(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-model:current-page="systemUserStore.page.current"
      v-model:page-size="systemUserStore.page.size"
      :page-sizes="[3, 5, 10, 25, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="systemUserStore.total"
      @size-change="systemUserStore.sizeChangeAction"
      @current-change="systemUserStore.currentChangeAction"
    />
  </div>
</template>

<style scoped lang="scss">
.user-box {
  .flex-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .flex-center {
    justify-content: center;
  }

  :deep(.el-card__header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-table__cell) {
    padding: 20px 0;
  }

  :deep(.el-pagination) {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
