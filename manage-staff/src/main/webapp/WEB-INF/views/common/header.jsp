
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#myNavbar">
				<span class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Logo</a>
		</div>
		<div class="collapse navbar-collapse" id="myNavbar">
			<ul class="nav navbar-nav" id="nav">
				<li id="li-home"><a href="/manage/home">Home</a></li>
				<li id="li-account"><a href="/manage/accounts">Accounts</a></li>
				<li id="li-order"><a href="/manage/orders">Orders</a></li>
				<li id="li-feedback"><a href="/manage/feedbacks">Feedbacks</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#"><span class="glyphicon glyphicon-user"></span>
						${user.dispName }</a></li>
			</ul>
		</div>
	</div>
</nav>