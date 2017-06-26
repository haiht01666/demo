package service;

import java.util.List;

import model.Article;

public interface ArticleService {
	public List<Article> getAllArticle();
	
	public Article getArticleById(int id);
	
	public int updateArticle(Article article);
	
	public int deleteArticle(int id);
	
	public int createArticle(Article article);
}
