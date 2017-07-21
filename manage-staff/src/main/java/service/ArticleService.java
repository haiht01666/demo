package service;

import java.util.List;

import model.Article;

public interface ArticleService {
	public List<Article> getAllArticle();

    int getNumberArticle();

    List<Article> getArticlePage(int limit, int offset);

    public Article getArticleById(int id);

    boolean existArticle(int id);

    public int updateArticle(Article article);
	
	public int deleteArticle(int id);
	
	public int createArticle(Article article);
	
	public List<Article> getHomeArticle();
	
	public int updateHome(Article article);
		
	public int deleteHome(int id);
	
	public Article getHomeById(int id);
}
