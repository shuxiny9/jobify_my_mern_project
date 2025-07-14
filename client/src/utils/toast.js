// 临时的 toast 替代方案，使用 console.log
export const toast = {
  success: (message) => {
    console.log('✅ SUCCESS:', message);
  },
  error: (message) => {
    console.error('❌ ERROR:', message);
  },
  info: (message) => {
    console.info('ℹ️ INFO:', message);
  },
  warning: (message) => {
    console.warn('⚠️ WARNING:', message);
  }
};