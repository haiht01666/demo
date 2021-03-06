package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import model.Article;

@Repository
public class ArticleDaoImpl extends DBManager implements ArticleDao{

	@Override
	public List<Article> getAllArticle() {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Article> result = new ArrayList<>();
		String sql = "SELECT id,title,cdate,content,sub_title,author,status, image_url  FROM articles;";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Article article = new Article();
				article.setId(rs.getInt(1));
				article.setTitle(rs.getString(2));
				article.setCdate(rs.getDate(3));
				article.setContent(rs.getString(4));
				article.setSubTitle(rs.getString(5));
				article.setAuthor(rs.getString(6));
				article.setStatus(rs.getInt(7));
				article.setImageUrl(rs.getString(8));
				result.add(article);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnectionS(conn,st,rs);
		}
		return result;
	}
	@Override
	public List<Article> getArticlePage(int limit, int offset) {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Article> result = new ArrayList<>();
		String sql = "SELECT id,title,cdate,content,sub_title,author,status, image_url  FROM articles order by cdate DESC LIMIT " + limit + " OFFSET " + offset;
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Article article = new Article();
				article.setId(rs.getInt(1));
				article.setTitle(rs.getString(2));
				article.setCdate(rs.getDate(3));
				article.setContent(rs.getString(4));
				article.setSubTitle(rs.getString(5));
				article.setAuthor(rs.getString(6));
				article.setStatus(rs.getInt(7));
				article.setImageUrl(rs.getString(8));
				result.add(article);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnectionS(conn,st,rs);
		}
		return result;
	}

	@Override
	public Article getArticleById(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Article article = new Article();
		String sql = "SELECT id,title,cdate,content,sub_title,author,status,image_url FROM articles where id=?;";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				article.setId(rs.getInt(1));
				article.setTitle(rs.getString(2));
				article.setCdate(rs.getDate(3));
				article.setContent(rs.getString(4));
				article.setSubTitle(rs.getString(5));
				article.setAuthor(rs.getString(6));
				article.setStatus(rs.getInt(7));
				article.setImageUrl(rs.getString(8));
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnection(conn,stmt,rs);
		}
		return article;
	}

	@Override
	public boolean existArticle(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		String sql = "SELECT EXISTS(SELECT 1 FROM articles WHERE id=?) COUNT";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getBoolean(1);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnection(conn,stmt,rs);
		}
		return false;
	}

	@Override
	public int updateArticle(Article article) {
		int result = 0;
		String sql = "update articles set title = ?,content=?,sub_title=?,author=? , image_url=? where id=? ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, article.getTitle());
			stmt.setString(2, article.getContent());
			stmt.setString(3, article.getSubTitle());
			stmt.setString(4, article.getAuthor());
			stmt.setString(5, article.getImageUrl());
			stmt.setInt(6, article.getId());
			result = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}

	@Override
	public int deleteArticle(int id) {
		int result = 0;
		String sql = "delete FROM articles where id=?;";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			result = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
	@Override
	public int getNumberArticle(){
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		String sql = "SELECT count(*) FROM articles";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				return rs.getInt(1);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					st.close();
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return 0;
	}

	@Override
	public int createArticle(Article article) {
		int result = 0;
		String sql = "insert into articles(title,content,sub_title,author,cdate,image_url) values(?,?,?,?,now(),?)";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, article.getTitle());
			stmt.setString(2, article.getContent());
			stmt.setString(3, article.getSubTitle());
			stmt.setString(4, article.getAuthor());
			stmt.setString(5, article.getImageUrl());
			result = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
	@Override
	public List<Article> getHomeArticle() {
		Connection conn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Article> result = new ArrayList<>();
		String sql = "SELECT id,title,cdate,content, image_url  FROM homes;";
		try {
			conn = getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(sql);
			while (rs.next()) {
				Article article = new Article();
				article.setId(rs.getInt(1));
				article.setTitle(rs.getString(2));
				article.setCdate(rs.getDate(3));
				article.setContent(rs.getString(4));
				article.setImageUrl(rs.getString(5));
				result.add(article);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnectionS(conn,st,rs);
		}
		return result;
	}
	@Override
	public int updateHome(Article article) {
		int result = 0;
		String sql = "update homes set content=?, image_url=? where id=? ";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setString(1, article.getContent());
			stmt.setString(2, article.getImageUrl());
			stmt.setInt(3, article.getId());
			result = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
	@Override
	public int deleteHome(int id) {
		int result = 0;
		String sql = "delete FROM homes where id=?;";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			result = stmt.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return result;
	}
	@Override
	public Article getHomeById(int id) {
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Article article = new Article();
		String sql = "SELECT id,title,cdate,content,image_url FROM homes where id=?;";
		try {
			conn = getConnection();
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1, id);
			rs = stmt.executeQuery();
			while (rs.next()) {
				article.setId(rs.getInt(1));
				article.setTitle(rs.getString(2));
				article.setCdate(rs.getDate(3));
				article.setContent(rs.getString(4));
				article.setImageUrl(rs.getString(5));
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			closeConnection(conn,stmt,rs);
		}
		return article;
	}

}
