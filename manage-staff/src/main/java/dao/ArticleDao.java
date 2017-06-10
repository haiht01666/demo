package dao;

import java.util.List;

import model.Article;

public interface ArticleDao {
	public List<Article> getAllArticle();
	
	public Article getArticleById(int id);
	
	public int updateArticle(Article article);
	
	public int deleteArticle(int id);
	
	public int createArticle(Article article);
}
