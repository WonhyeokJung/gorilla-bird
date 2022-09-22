function isValid(target, value, value2=undefined) {
  const errors = {
    email: /^[0-9a-zA-z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,4}$/.test(value) ? '' : '이메일 양식이 맞지 않습니다.',
    password: /(?=.*\d)(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*[A-Z]).{8,}/.test(value) ? '' : '비밀번호는 대소문자, 숫자 그리고 특수문자 최소 하나씩 포함하고 8자 이상이어야 합니다.',
    confirmPassword: (value === value2) ? '' : '비밀번호가 일치하지 않습니다.'
  }

  return errors[target];
}

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      validCheck: isValid,
    }
  }
});
