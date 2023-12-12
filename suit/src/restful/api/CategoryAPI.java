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
import restful.entity.Category;
import restful.entity.User;

@Path("/category")
public class CategoryAPI {
	private @Context HttpServletRequest request;
	private final int pageSize = 5;
	
	@POST
	@Path("/getTotalPages")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result getTotalPages() {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryAllCategory", Category.class)
				.getResultList();
		int total = categoryList.size() / pageSize + (categoryList.size() % pageSize == 0 ? 0 : 1);
		return new Result(1, "获取成功", total, "");
	}
	
	@POST
	@Path("/queryCategoryByPage")
	@Consumes("application/json;charset=UTF-8") 
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result queryCategoryByPage(JSONObject input) {
		int pageNum = input.getInt("pageNum");
		List<Category> result = EM.getEntityManager()
				.createNamedQuery("Category.queryAllCategory", Category.class)
				.getResultList();
		int total = result.size() / pageSize + (result.size() % pageSize == 0 ? 0 : 1);
		if (pageNum > total || pageNum < 1) {
			return new Result(0, "页码无效", input, "");
		} else {
			List<Category> categoryList = new ArrayList<Category>();
			for (int i = Math.max(0, (pageNum - 1) * pageSize); i < Math.min(pageNum * pageSize, result.size()); ++i) {
				categoryList.add(result.get(i));
			}
			return new Result(1, "查询成功", categoryList, "");
		}
	}
	
	@POST
	@Path("/queryAllCategory")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result queryAllCategory() {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryAllCategory", Category.class)
				.getResultList();
		return new Result(1, "查询成功", categoryList, "");
	}
	
	@POST
	@Path("/add")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result add(Category category) {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryCategoryByNumber", Category.class)
				.setParameter("number", category.getNumber())
				.getResultList();
		if (categoryList.isEmpty()) {
			category.setId(0);
			category = EM.getEntityManager().merge(category);
			EM.getEntityManager().persist(category);
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "添加成功", category, "");
		} else {
			return new Result(0, "服饰类别已存在", category, "");
		}
	}
	
	@POST
	@Path("/ins")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result ins(List<Category> categoryList) {
		for (Category category : categoryList) {
			add(category);
		}
		return new Result(1, "添加成功", categoryList, "");
	}

	@POST
	@Path("/update")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result update(Category category) {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryCategoryByNumber", Category.class)
				.setParameter("number", category.getNumber())
				.getResultList();
		if (categoryList.isEmpty()) {
			return new Result(0, "服饰类别不存在", category, "");
		} else {
			Category temp = categoryList.get(0);
			category.setId(temp.getId());
			EM.getEntityManager().persist(EM.getEntityManager().merge(category));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "修改成功", category, "");
		}
		
	}

	@POST
	@Path("/delete")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("admin")
	public Result delete(Category category) {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryCategoryByNumber", Category.class)
				.setParameter("number", category.getNumber())
				.getResultList();
		if (categoryList.isEmpty()) {
			return new Result(0, "服饰类别不存在", category, "");
		} else {
			Category temp = categoryList.get(0);
			category.setId(temp.getId());
			EM.getEntityManager().remove(EM.getEntityManager().merge(category));
			EM.getEntityManager().getTransaction().commit();
			return new Result(1, "删除成功", category, "");
		}
	}
	
	@POST
	@Path("/queryAllClothType")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	@Permission("login")
	public Result queryAllClothType() {
		List<Category> categoryList = EM.getEntityManager()
				.createNamedQuery("Category.queryAllCategory", Category.class)
				.getResultList();
		return new Result(1, "查询成功", categoryList, "");
	}
}
