$(function() {
    $('[name="post_review_star"]:radio').change( function() {
        if($('[id=review-formStar01]').prop('checked')){
            $('.balBox').fadeOut( 0 );
            $('.review-formStar-balloon-01').fadeIn( 0 );
        } else if ($('[id=review-formStar02]').prop('checked')) {
            $('.balBox').fadeOut( 0 );
            $('.review-formStar-balloon-02').fadeIn( 0 );
        } else if ($('[id=review-formStar03]').prop('checked')) {
            $('.balBox').fadeOut( 0 );
            $('.review-formStar-balloon-03').fadeIn( 0 );
        } else if ($('[id=review-formStar04]').prop('checked')) {
            $('.balBox').fadeOut( 0 );
            $('.review-formStar-balloon-04').fadeIn( 0 );
        } else if ($('[id=review-formStar05]').prop('checked')) {
            $('.balBox').fadeOut( 0 );
            $('.review-formStar-balloon-05').fadeIn( 0 );
        }
    });
});