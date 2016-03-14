/// <reference path="./indexdb.d.ts"/>
/// <reference no-default-lib="true"/>

// html  notifications

/**
 * Notification(title, options)
 *  @param {String} title 要显示的通知标题
 *  @param {Object} options 备选项参数，键值对
 * 
 * option struct
 * dictionary NotificationOptions {
 *   NotificationDirection dir = "auto";
 *   DOMString lang = "";
 *   DOMString body;
 *   DOMString tag;
 *   DOMString icon;//在实例化的时候会异步的去获取
 * };
 */
interface IHTMLNotificationOptions {
  lang?: string;
  body?: string
  tag?: string;
  icon?: string;
}
interface IHTMLNotificationObject extends IHTMLNotificationOptions { }

interface INotification {
}



declare class Notification {
  constructor(title: string, options?: IHTMLNotificationOptions);
}


//index db

