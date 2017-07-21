package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ArticleDao;
import model.Article;

@Service
public class ArticleServiceImpl implements ArticleService {
	@Autowired
	ArticleDao dao;

	@Override
	public List<Article> getAllArticle() {
		return dao.getAllArticle();
	}
	@Override
	public int getNumberArticle() {
		return dao.getNumberArticle();
	}
	@Override
	public List<Article> getArticlePage(int limit, int offset) {
		return dao.getArticlePage(limit, offset);
	}

	@Override
	public Article getArticleById(int id) {
		return dao.getArticleById(id);
	}

	@Override
	public boolean existArticle(int id) {
		return dao.existArticle(id);
	}

	@Override
	public int updateArticle(Article article) {
		return dao.updateArticle(article);
	}

	@Override
	public int deleteArticle(int id) {
		return dao.deleteArticle(id);
	}

	@Override
	public int createArticle(Article article) {
		return dao.createArticle(article);
	}
	@Override
	public List<Article> getHomeArticle() {
		return dao.getHomeArticle();
	}
	@Override
	public int updateHome(Article article) {
		return dao.updateHome(article);
	}
	@Override
	public int deleteHome(int id) {
		return dao.deleteHome(id);
	}
	@Override
	public Article getHomeById(int id) {
		return dao.getHomeById(id);
	}
}
