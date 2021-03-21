# **Project {{ project_name }}**
___

#### **Summary** {{ completed }}/{{total}} Todos completed

### **Pending**

{{#PendingTodo}}
* {{.}}
{{/PendingTodo}}


### **Completed**

{{#CompletedTodo}}
* {{.}}
{{/CompletedTodo}}