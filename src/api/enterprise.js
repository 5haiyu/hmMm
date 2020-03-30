// 封装所有与企业相关的网络请求
// 导入封装的 axios
import instance from "../utils/http";

// 封装接口：
// 获取企业列表
export function apiGetList({ name, page, limit, eid, username, status }) {
  return instance({
    url: "/enterprise/list",
    method: "GET",
    // 由于请求方式是 get,参数应该放到 params 中
    params: {
      name,
      page,
      limit,
      eid,
      username,
      status
    }
  });
}

// 添加企业
export function apiAddEnt({ eid, name, short_name, intro, remark }) {
  return instance({
    url: "/enterprise/add",
    method: "POST",
    // 由于请求方式是 post，参数应该放到 data 中
    data: {
      eid,
      name,
      short_name,
      intro,
      remark
    }
  });
}

// 修改企业状态
export function apiStatusEnt(id) {
  return instance({
    url: "/enterprise/status",
    method: "POST",
    data: {
      id: id
    }
  });
}

// 删除企业
export function apiDelEnt(id) {
  return instance({
    url: "/enterprise/remove",
    method: "POST",
    data: {
      id
    }
  });
}

// 编辑企业数据
export function apiEditEnt({ id, name, eid, short_name, intro, remark }) {
  return instance({
    url: "/enterprise/edit",
    method: "POST",
    data: {
      id,
      name,
      eid,
      short_name,
      intro,
      remark
    }
  });
}
