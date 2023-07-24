const instantiatedServes: any[] = [];

/**
 * 属性装饰器
 * @param target 静态属性是类的构造函数，实例的属性是类的原型对象
 * @param property 属性名称
 */
// (property) name:class = new property()
export function AutowiredService(Type?: Function) {
  return (target: any, property: string) => {
    if (!Type) {
      console.error(`${target.constructor.name}中服务定义错误！`);
      return;
    }

    let serveTemp: any = null;
    serveTemp = instantiatedServes.find((serve) => {
      return serve instanceof Type;
    });

    if (!serveTemp) {
      // @ts-ignore
      serveTemp = new Type();
      instantiatedServes.push(serveTemp);
    }

    const getter = () => {
      if (serveTemp) {
        return serveTemp;
      } else {
        return () => {
          return null;
        };
      }
    };

    Object.defineProperty(target, property, {
      configurable: true,
      enumerable: true,
      get: getter,
      set: undefined,
    });
  };
}
