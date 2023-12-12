package restful.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import net.sf.json.JSONObject;
import restful.annotation.Permission;
import restful.bean.Result;
import restful.database.EM;
import restful.entity.User;

@Path("/user")
public class UserAPI {
	private @Context HttpServletRequest request;
	private final int pageSize = 5;
	
	@POST
	@Path("/login")
	@Consumes("application/json;charset=UTF-8") 
	@Produces("application/json;charset=UTF-8")
	public Result login(User user) {
		List<User> userList = EM.getEntityManager()
				  .createNamedQuery("User.queryUserByName", User.class)
				  .setParameter("name", user.getName())
				  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		}
		User result = userList.get(0);
		if (!result.getPassword().equals(user.getPassword())){
			return new Result(0, "用户名和密码不匹配", user, "");
		} else {
			request.getSession().setAttribute("curname", user.getName());
			System.out.println("username:" + user.getName());
			return new Result(1, "登录成功", result, "");
		}
	}
	
	@POST
	@Path("/queryUserByPage")
	@Consumes("application/json;charset=UTF-8") 
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result queryUserByPage(JSONObject input) {
		int pageNum = input.getInt("pageNum");
		List<User> result = EM.getEntityManager()
				.createNamedQuery("User.queryAllUser", User.class)
				.getResultList();
		int total = result.size() / pageSize + (result.size() % pageSize == 0 ? 0 : 1);
		if (pageNum > total || pageNum < 1) {
			return new Result(0, "页码无效", input, "");
		} else {
			List<User> userList = new ArrayList<User>();
			for (int i = Math.max(0, (pageNum - 1) * pageSize); i < Math.min(pageNum * pageSize, result.size()); ++i) {
				userList.add(result.get(i));
			}
			return new Result(1, "查询成功", userList, "");
		}
	}
	
	@POST
	@Path("/queryUserByName")
	@Consumes("application/json;charset=UTF-8") 
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result queryUserByName(User user) {
		List<User> userList = EM.getEntityManager()
		  .createNamedQuery("User.queryUserByName", User.class)
		  .setParameter("name", user.getName())
		  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		} else {
			return new Result(1, "查询成功", userList.get(0), "");
		}
	}
	
	@POST
	@Path("/queryUserByNameSelf")
	@Consumes("application/json;charset=UTF-8") 
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result queryUserByNameSelf(User user) {
		List<User> userList = EM.getEntityManager()
		  .createNamedQuery("User.queryUserByName", User.class)
		  .setParameter("name", user.getName())
		  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		} else {
			return new Result(1, "查询成功", userList.get(0), "");
		}
	}
	
	@POST
	@Path("/updateSelf")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result updateSelf(User user) {
		List<User> userList = EM.getEntityManager()
				  .createNamedQuery("User.queryUserByName", User.class)
				  .setParameter("name", user.getName())
				  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		} else {
			EM.getEntityManager().persist(EM.getEntityManager().merge(user));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "修改成功", user, "");
		}
	}
	
	@POST
	@Path("/queryAllUser")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result queryAllUser() {
		List<User> userList = EM.getEntityManager()
				.createNamedQuery("User.queryAllUser", User.class)
				.getResultList();
		return new Result(1, "查询成功", userList, "");
	}
	
	@POST
	@Path("/add")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result add(User user) {
		List<User> userList = EM.getEntityManager()
				  .createNamedQuery("User.queryUserByName", User.class)
				  .setParameter("name", user.getName())
				  .getResultList();
		if (userList.isEmpty()) {
			user.setId(0);
			user = EM.getEntityManager().merge(user);
			EM.getEntityManager().persist(user);
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "添加成功", user, "");
		} else {
			return new Result(0, "用户已存在", user, "");
		}
	}

	@POST
	@Path("/update")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result update(User user) {
		List<User> userList = EM.getEntityManager()
				  .createNamedQuery("User.queryUserByName", User.class)
				  .setParameter("name", user.getName())
				  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		} else {
			EM.getEntityManager().persist(EM.getEntityManager().merge(user));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "修改成功", user, "");
		}
	}

	@POST
	@Path("/delete")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result delete(User user) {
		List<User> userList = EM.getEntityManager()
				  .createNamedQuery("User.queryUserByName", User.class)
				  .setParameter("name", user.getName())
				  .getResultList();
		if (userList.isEmpty()) {
			return new Result(0, "用户不存在", user, "");
		} else {
			EM.getEntityManager().remove(EM.getEntityManager().merge(user));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "删除成功", user, "");
		}
	}
	
	@POST
	@Path("/getTotalPages")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result getTotalPages() {
		List<User> userList = EM.getEntityManager()
				.createNamedQuery("User.queryAllUser",User.class)
				.getResultList();
		int total = userList.size() / pageSize + (userList.size() % pageSize == 0 ? 0 : 1);
		return new Result(1, "获取成功", total, "");
	}
}
