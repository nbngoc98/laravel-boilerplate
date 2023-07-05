$(function () {
	// 画像圧縮（数値が高いほど高画質）
	const IMAGE_LEVEL		= 0.5;
	const IMAGE_MAX_WIDTH	= 1024;
	const IMAGE_MAX_HEIGHT	= 1024;

	REVIEW_POST_DATA = new FormData();

	// 画像
	FILE_COUNT = 0;

	// 画像のモーダルウィンドウ化
	$('.lightbox').modaal({
		type: 'image'
	});

	// 新規登録
	$("#registButton").on('click', function () {
		$('.users-signupForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[user_email]', $('input[name="user_email"]').val());
		post_data.append('post_data[user_password]', $('input[name="user_password"]').val());
		post_data.append('post_data[user_id]', $('input[name="user_id"]').val());
		post_data.append('post_data[user_nickname]', $('[name="user_nickname"]').val());
		post_data.append('post_data[user_kiyaku]', $('[name="user_kiyaku"]:checked').val());
		post_data.append('action', 'regist_user');
		post_data.append('nonce', regist_nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				if (response['result'] == false) {
					var html_text = '';
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-signupForm-error').html(html_text).show();
				} else {
					$('.users-signup').eq(0).hide();
					$('.users-signup').eq(1).show();
				}
			}
		});
		return false;
	});

	// ログイン
	$("#loginButton").on('click', function () {
		$('.users-signupForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[login_email]', $('input[name="login_email"]').val());
		post_data.append('post_data[login_password]', $('input[name="login_password"]').val());
		post_data.append('action', 'login_user');
		post_data.append('nonce', login_nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				if (response['result'] == false) {
					var html_text = '';
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-signupForm-error').html(html_text).show();
				} else {
					location.href = response['url'];
					return;
				}
			}
		});
		return false;
	});

	// パスワードリセット（メール送信）
	$("#resetPasswordButton").on('click', function () {
		$('.users-passwordForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[reset_email]', $('input[name="reset_email"]').val());
		post_data.append('action', 'send_mail_for_reset_password');
		post_data.append('nonce', nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				var html_text = '';
				if (response['result'] == false) {
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-passwordForm-error').html(html_text).show();
				} else {
					$('input[name="reset_email"]').val('');
					html_text += '<span>メールを送信しました。</span>';
				}
				$('.users-passwordForm-error').html(html_text).show();
			}
		});
		return false;
	});


	// パスワード変更
	$("#changePasswordButton").on('click', function () {
		$('.users-passwordForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[change_password]', $('input[name="change_password"]').val());
		post_data.append('post_data[re_change_password]', $('input[name="re_change_password"]').val());
		post_data.append('post_data[change_password_key]', $('input[name="change_password_key"]').val());
		post_data.append('action', 'change_password');
		post_data.append('nonce', nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				if (response['result'] == false) {
					var html_text = '';
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-passwordForm-error').html(html_text).show();
				} else {
					$('.users-password').eq(0).hide();
					$('.users-password').eq(1).show();
				}
			}
		});
		return false;
	});

	// 設定ページ
	$("#settingButton").on('click', function () {
		$('.settingErrorMessage').text('');
		$('.settingSuccessMessage').text('');
		var post_data = new FormData();

		if ($('input[name="setting_avatar"]')[0].files[0]) {
			post_data.append('setting_avatar', $('input[name="setting_avatar"]')[0].files[0]);
		}
		post_data.append('post_data[setting_nickname]', $('input[name="setting_nickname"]').val());
		post_data.append('post_data[setting_user_id]', $('input[name="setting_user_id"]').val());
		post_data.append('post_data[setting_age]', $('[name="setting_age"]').val());
		post_data.append('post_data[setting_age_flag]', $('[name="setting_age_flag"]').prop('checked'));
		post_data.append('post_data[setting_instagram]', $('input[name="setting_instagram"]').val());
		post_data.append('post_data[setting_twitter]', $('input[name="setting_twitter"]').val());
		post_data.append('post_data[setting_youtube]', $('input[name="setting_youtube"]').val());
		post_data.append('post_data[setting_profile]', $('textarea[name="setting_profile"]').val());
		post_data.append('action', 'update_setting');
		post_data.append('nonce', nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				if (response['result'] == false) {
					var html_text = '<ul>';
					$.each(response['message'], function (index, value) {
						html_text += '<li>' + value + '</li>';
					});
					html_text += '</ul>';
					$('.settingErrorMessage').html(html_text).show();
				} else {
					var html_text = '<ul><li>変更が完了しました。</li></ul>';
					$('.settingSuccessMessage').html(html_text).show();
				}
			}
		});
		return false;
	});

	// 画像のバリデーションとプレビュー
	$('.uploadImage').on('change', function () {
		obj = $(this);
		var file = obj.prop('files')[0];
		if (!file) {
			return;
		}
		// 画像の形式
		if (!file.type.match(/image/)) {
			var message = '画像ファイルではありません。';
			obj.val('');
			alert(message);
			return false;
		}
		// 画像のバリデーション
		if (file.size > image_max_size) {
			var message = '画像ファイルが' + image_max_size_message + 'Mを超えてます';
			obj.val('');
			alert(message);
			return false;
		}

		// 画像プレビュー
		/*
		var file_reader = new FileReader();
		file_reader.onloadend = function () {
			// アバター変更
			if ($('.users-formAvatar').get(0)) {
				var preview = $('.users-formAvatar');
				$(preview).html('<img src="' + file_reader.result + '"/>');
				// レビュー投稿
			} else if (obj.closest('li').find('.preview').get(0)) {
				obj.closest('li').find('.preview').attr('src', file_reader.result);
			}
		}
		file_reader.readAsDataURL(file);
		*/

		// アバター変更
		if ($('.users-formAvatar').get(0)) {
			var file_reader = new FileReader();
			file_reader.onloadend = function () {
				var preview = $('.users-formAvatar');
				$(preview).html('<img src="' + file_reader.result + '"/>');
			}
			file_reader.readAsDataURL(file);
			// レビュー投稿
		} else if (obj.closest('li').find('.preview').get(0)) {
			var index = $('.uploadImage').index(this);

			new Compressor(file, {
				quality: IMAGE_LEVEL,
				maxWidth: IMAGE_MAX_WIDTH,
				maxHeight: IMAGE_MAX_HEIGHT,
				mimeType: 'image/jpeg',
				success(convert_image) {
					var file_reader = new FileReader();
					file_reader.readAsDataURL(convert_image);
					file_reader.onloadend = function () {
						obj.closest('li').find('.preview').attr('src', file_reader.result);
						REVIEW_POST_DATA.append('file_data[' + index + ']', convert_image);
						FILE_COUNT++;
					}
				}
			});
		}
	});

	// 画像クリア
	$(".cancel").on('click', function () {
		var obj = $(this).closest('li');
		obj.find('.uploadImage').val('');
		obj.find('.preview').attr('src', default_image);

		var index = $('.cancel').index(this);
		REVIEW_POST_DATA.delete('file_data[' + index + ']');
		if (FILE_COUNT > 0) {
			FILE_COUNT--;
		}
	});

	// 口コミ投稿
	$("#postReviewButton").on('click', function () {
		if (!confirm('クチコミの修正・削除はできません。よろしいですか？')) {
			return false;
		}

		OBJ = $(this);
		POST_NAME = $(this).val();
		$(this).val('投稿中…');

		$('.postReviewErrorMessage').text('');

		if ($('input[name="post_review_star"]:checked').val()) {
			REVIEW_POST_DATA.append('post_data[post_review_star]', $('input[name="post_review_star"]:checked').val());
		}
		REVIEW_POST_DATA.append('post_data[post_review_textarea]', $('textarea[name="post_review_textarea"]').val());
		REVIEW_POST_DATA.append('post_data[goods_id]', $('input[name="goods_id"]').val());
		REVIEW_POST_DATA.append('action', 'post_review');
		REVIEW_POST_DATA.append('nonce', review_nonce);

		if (FILE_COUNT != 0) {
			$('.roading').removeClass('hide');
		}

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: REVIEW_POST_DATA
		}).done(function (response) {
			$('.roading').addClass('hide');
			if (response['result'] == false) {
				var html_text = '<ul>';
				$.each(response['message'], function (index, value) {
					html_text += '<li>' + value + '</li>';
				});
				html_text += '</ul>';
				$('.postReviewErrorMessage').html(html_text).show();
			} else {
				// 削除処理
				$('.uploadImage').val('');
				$('.preview').text('');
				$('[name="post_review_star"]').attr('checked', false);
				$('[name="post_review_textarea"]').val('');
				location.href = goods_url;
			}
		}).always(function (response) {
			OBJ.val(POST_NAME);
		});
		return false;
	});

	// 最近投稿したクチコミの無限スクロール
	$('#reviewInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// 最近投稿したクチコミへ追記
				var nextUrl = $(element).find('#reviewInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#reviewInfiniteScrollBtn').remove();
				} else {
					$('#reviewInfiniteScrollBtn').attr('href', nextUrl);
				}
				var reviewBox = $(element).find('.review-columnlist').html();
				$('.review-columnlist:first').append(reviewBox);
			}
		});
		return false;
	});

	// 最近投稿した商品の無限スクロール
	$('#goodsInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// 最近投稿した商品
				var nextUrl = $(element).find('#goodsInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#goodsInfiniteScrollBtn').remove();
				} else {
					$('#goodsInfiniteScrollBtn').attr('href', nextUrl);
				}
				var goodsList = $(element).find('.goodsList').html();
				$('.goodsList').append(goodsList);
			}
		});
		return false;
	});

	// いいねしたクチコミの無限スクロール
	$('#thanksInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// いいねしたクチコミ
				var nextUrl = $(element).find('#thanksInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#thanksInfiniteScrollBtn').remove();
				} else {
					$('#thanksInfiniteScrollBtn').attr('href', nextUrl);
				}
				var thanksBox = $(element).find('.thanksBox').html();
				$('.thanksBox').append(thanksBox);
			}
		});
		return false;
	});

	// 保存したクチコミの無限スクロール
	$('#clipReviewInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// 保存したクチコミ
				var nextUrl = $(element).find('#clipReviewInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#clipReviewInfiniteScrollBtn').remove();
				} else {
					$('#clipReviewInfiniteScrollBtn').attr('href', nextUrl);
				}
				var clipReviewBox = $(element).find('.clipReviewBox').html();
				$('.clipReviewBox').append(clipReviewBox);
			}
		});
		return false;
	});

	// 下書きしたクチコミの無限スクロール
	$('#draftInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// 下書きしたクチコミ
				var nextUrl = $(element).find('#draftInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#draftInfiniteScrollBtn').remove();
				} else {
					$('#draftInfiniteScrollBtn').attr('href', nextUrl);
				}
				var articlesListsWithprice = $(element).find('.articlesLists-withprice').html();
				$('.articlesLists-withprice').append(articlesListsWithprice);
			}
		});
		return false;
	});

	// フォローの無限スクロール
	$('#followInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				// フォロー
				var nextUrl = $(element).find('#followInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#followInfiniteScrollBtn').remove();
				} else {
					$('#followInfiniteScrollBtn').attr('href', nextUrl);
				}
				var usersFollowing = $(element).find('.usersFollowing').html();
				$('.usersFollowing').append(usersFollowing);
			}
		});
		return false;
	});

	// フォロワーの無限スクロール
	$('#followerInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				var nextUrl = $(element).find('#followerInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#followerInfiniteScrollBtn').remove();
				} else {
					$('#followerInfiniteScrollBtn').attr('href', nextUrl);
				}
				var usersFollowers = $(element).find('.usersFollowers').html();
				$('.usersFollowers').append(usersFollowers);
			}
		});
		return false;
	});

	// いいねしてくれたユーザの無限スクロール
	$('#thankerInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				var nextUrl = $(element).find('#thankerInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#thankerInfiniteScrollBtn').remove();
				} else {
					$('#thankerInfiniteScrollBtn').attr('href', nextUrl);
				}
				var usersLikes = $(element).find('.usersLikes').html();
				$('.usersLikes').append(usersLikes);
			}
		});
		return false;
	});

	// お気に入りの無限スクロール
	$('#favoriteInfiniteScrollBtn').on('click', function () {
		var url = $(this).attr('href');
		if (!url) {
			return false;
		}

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (response) {
				if (!response) {
					return false;
				}

				// DOM化
				var element = document.createElement('div');
				element.innerHTML = response;

				var nextUrl = $(element).find('#favoriteInfiniteScrollBtn').attr('href');
				if (!nextUrl) {
					$('#favoriteInfiniteScrollBtn').remove();
				} else {
					$('#favoriteInfiniteScrollBtn').attr('href', nextUrl);
				}
				var favoriteList = $(element).find('.favoriteList').html();
				$('.favoriteList').append(favoriteList);
			}
		});
		return false;
	});

	// AjaxAction
	$(".ajaxAction").on('click', function () {
		var action = $(this).data('action');
		if (action == 'report') {
			if (!confirm('管理者へ通報しますが、よろしいですか？')) {
				return false;
			}
		}

		if (action == 'deletedraft') {
			if (!confirm('下書きを削除しますが、よろしいですか？')) {
				return false;
			}
		}

		var post_data = new FormData();
		post_data.append('post_data[action]', action);
		if ($(this).data('post_id')) {
			post_data.append('post_data[post_id]', $(this).data('post_id'));
		}
		if ($(this).data('user_id')) {
			post_data.append('post_data[user_id]', $(this).data('user_id'));
		}
		if (action == 'draft') {
			post_data.append('post_data[draft_content]', $('textarea[name="post_review_textarea"]').val());
		}
		post_data.append('action', 'tap_action');
		post_data.append('nonce', nonce);

		OBJECT = $(this);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data
		}).done(function (response) {
			if (response['result'] == true) {
				switch (response['action']) {
					case 'thanks':
						$('.userLikeCount span').text(response['thanker_count'].toLocaleString());
						$('.userLikeSumCount span').text(response['thanker_sum_count'].toLocaleString());
						OBJECT.addClass('active');
						OBJECT.data('action', 'unthanks');
						OBJECT.find('span').text('いいねをやめる');
						break;

					case 'unthanks':
						$('.userLikeCount span').text(response['thanker_count'].toLocaleString());
						$('.userLikeSumCount span').text(response['thanker_sum_count'].toLocaleString());
						OBJECT.removeClass('active');
						OBJECT.data('action', 'thanks');
						OBJECT.find('span').text('いいね');
						break;

					case 'clip':
						$('.userClipCount span').text(response['cliper_count'].toLocaleString());
						OBJECT.addClass('active');
						OBJECT.data('action', 'unclip');
						OBJECT.find('span').text('保存をやめる');
						break;

					case 'unclip':
						$('.userClipCount span').text(response['cliper_count'].toLocaleString());
						OBJECT.removeClass('active');
						OBJECT.data('action', 'clip');
						OBJECT.find('span').text('保存');
						break;

					case 'follow':
						$('.userFollowerCount span').text(response['follower_count'].toLocaleString());
						OBJECT.addClass('active');
						OBJECT.data('action', 'unfollow');
						OBJECT.find('span').text('フォローをやめる');
						break;

					case 'unfollow':
						$('.userFollowerCount span').text(response['follower_count'].toLocaleString());
						OBJECT.removeClass('active');
						OBJECT.data('action', 'follow');
						OBJECT.find('span').text('フォローする');
						break;

					case 'favorite':
						OBJECT.find('i').removeClass('far').addClass('fas');
						OBJECT.data('action', 'unfavorite');
						break;

					case 'unfavorite':
						OBJECT.find('i').removeClass('fas').addClass('far');
						OBJECT.data('action', 'favorite');
						break;

					case 'report':
						OBJECT.closest('.review-card--report').append('<i class="fas fa-bullhorn"></i>通報済');
						OBJECT.remove();
						alert('通報が完了しました。ご協力ありがとうございます。');
						break;

					case 'draft':
						$('.draft-alert').show();
						$('.draft-alert').delay(2000).queue(function () {
							$(this).hide();
							$(this).dequeue();
						});
						break;

					case 'deletedraft':
						window.location.href = '/draft/';
						break;

					default:
						break;
				}
				return true;
			} else {
				alert(response['message']);
				return false;
			}
		}).always(function (response) {});
		return false;
	});

	// メールアドレスリセット（メール送信）
	$("#resetEmailButton").on('click', function () {
		$('.users-passwordForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[reset_email]', $('input[name="reset_email"]').val());
		post_data.append('action', 'send_mail_for_reset_email');
		post_data.append('nonce', nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				var html_text = '';
				if (response['result'] == false) {
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-passwordForm-error').html(html_text).show();
				} else {
					$('input[name="reset_email"]').val('');
					html_text += '<span>メールを送信しました。</span>';
				}
				$('.users-passwordForm-error').html(html_text).show();
			}
		});
		return false;
	});

	// メールアドレス変更
	$("#changeEmailButton").on('click', function () {
		$('.users-passwordForm-error').text('');
		var post_data = new FormData();

		post_data.append('post_data[change_email_key]', $('input[name="change_email_key"]').val());
		post_data.append('action', 'change_email');
		post_data.append('nonce', nonce);

		$.ajax({
			type: 'POST',
			url: ajax_url,
			dataType: 'json',
			processData: false,
			contentType: false,
			data: post_data,
			success: function (response) {
				if (response['result'] == false) {
					var html_text = '';
					$.each(response['message'], function (index, value) {
						html_text += '<span>' + value + '</span>';
					});
					$('.users-passwordForm-error').html(html_text).show();
				} else {
					$('.users-password').eq(0).hide();
					$('.users-password').eq(1).show();
				}
			}
		});
		return false;
	});
});