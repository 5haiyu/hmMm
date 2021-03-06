import instance from '../utils/http'

export function apiQueList({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}

// 封装添加题库的方法
export function apiAddQuestion(data) {
    return instance({
      url: "/question/add",
      method: "POST",
      data: data
    });
  }
  