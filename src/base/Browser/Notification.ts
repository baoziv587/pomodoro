namespace app.utils {


  // create a Notification .
  export var createNotification = (
    title: string,
    options?: IHTMLNotificationOptions  //optional parameter
  ): Notification => {
    
    if (!Notification) return;
    return new Notification(title, options ? options : {})

  }

}    