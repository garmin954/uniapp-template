class Storage {
    /**
     * 设置缓存
     * @param key
     * @param value
     * @param time 分钟
     */
    set(key, value, time) {
      time = time ? Date.now() + time * 1000 * 60 : 0;
      const params = {
        value,
        time: time || null,
      };
      uni.setStorageSync(key, JSON.stringify(params))
    }
  
    get(key) {
      let params = uni.getStorageSync(key);
      if (!params) return null;
      params = JSON.parse(params);
      if (params.time) {
        if (params.time > Date.now()) {
          return params.value;
        }
        uni.removeStorageSync(key);
        return null;
      }
      return params.value;
    }
  
    remove(key) {
      uni.removeStorageSync(key);
    }
  
    clear() {
      uni.clearStorageSync()
    }
  }
  
  export default new Storage();