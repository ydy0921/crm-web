//! =========自定义：与后端约定的配置节，包含服务地址、回调异常处理等 =============
import { Env, IServerConfig } from "../core/configAdapter";
import { Utils } from "../core/utils";
import { Message } from "element-ui";

export const serverConfig: IServerConfig = {
  env: Env.DEV,
  sites: Utils.getSiteInfo(),
  protocol: window.location.protocol,
  successCode: "0",
  // 通用的异常响应回调；根据与后端约定好的异常类型、结构做统一的处理提示等
  successCallback: async (res: any) => {
    if (res.taskStatus === 0) {
      return;
    }
  },
  failCallback: async (res: any, resolve: Function, reject: Function) => {
    if (res.errorCode === 500) {
      return;
    }

    const [message, dangerouslyUseHTMLString] = formateErrMessage(
      res.subMessage
    );
    switch (res.errorCode) {
      case 1001: {
        switch (res.subCode) {
          case 10034: {
            // 自定义处理方法
            reject(res);
            break;
          }
          default: {
            showMessageBox({
              message: res.subMessage,
              type: "error",
            });
            reject(res);
            break;
          }
        }
      }
      default: {
        showMessageBox({
          dangerouslyUseHTMLString,
          message,
          type: "error",
          duration: 3000,
        });
        reject(res);
        break;
      }
    }
  },
};

// ======================辅助支持方法===========================
function formateErrMessage(message: string): [string, boolean] {
  let formattedMessage: string = message;
  const hasLineBreak = /\r\n/.test(message) || /\\r\\n/.test(message);

  if (hasLineBreak) {
    formattedMessage = message
      .replace(/\r\n/gi, "<br>")
      .replace(/\\r\\n/gi, "<br>");
  }
  return [formattedMessage, hasLineBreak];
}

let messageBox: any = null;
function showMessageBox(messageInfo: { [key: string]: any }) {
  if (messageBox) {
    messageBox.close();
  }
  const errorMessage: string =
    messageInfo.message === "Network Error" ? "网络错误" : messageInfo.message;
  messageBox = Message({
    message: errorMessage,
    type: messageInfo.type || "success",
    duration: messageInfo.duration || 1500,
    dangerouslyUseHTMLString: messageInfo.dangerouslyUseHTMLString || false,
    offset: 40,
    onClose: () => {
      if (messageInfo?.onClose) {
        messageInfo.onClose();
      }
      messageBox = null;
    },
  });
}
