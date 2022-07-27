import $ from 'jquery';

const add_window_size_listen = () => {
    $(window).on(`resize.screen`, () => {
        let unit = $(window).width() / 100;
        // $('html').css("font-size", `${unit}px`);
    });
};

export {
    add_window_size_listen
}