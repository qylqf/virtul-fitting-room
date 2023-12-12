package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@NamedQueries({
    @NamedQuery(name = "User.queryAllUser", query = "SELECT user FROM User user"),
    @NamedQuery(name = "User.queryUserByName", query = "SELECT u FROM User u WHERE u.name = :name"),
    @NamedQuery(name = "User.queryUserById", query = "SELECT u FROM User u WHERE u.id = :id")
})
public class User extends IdEntity {
	
	private String name;
	
	private String password;
	
	private String realName;
	
	private Boolean isAdmin;
	
	private String email;
	
	private String model;
	
	private Boolean sex;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Boolean getSex() {
		return sex;
	}

	public void setSex(Boolean sex) {
		this.sex = sex;
	}
}
