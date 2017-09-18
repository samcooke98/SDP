import React from 'react';

export default function MyComponent(props) {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 129 169" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
      <title>Group</title>
      <desc>Created using Figma</desc>
      <g id="Canvas" transform="translate(-1563 1483)">
        <g id="Group">
          <g id="Rectangle 7">
            <use xlinkHref="#path0_fill" transform="translate(1572.28 -1483)" fill={props.colour} />
          </g>
          <g id="Rectangle 8">
            <use xlinkHref="#path1_fill" transform="translate(1563 -1455.35)" fill="#F8F8F8" />
            <mask id="mask0_outline_ins">
              <use xlinkHref="#path1_fill" fill="white" transform="translate(1563 -1455.35)" />
            </mask>
            <g mask="url(#mask0_outline_ins)">
              <use xlinkHref="#path2_stroke_2x" transform="translate(1563 -1455.35)" fill={props.colour} />
            </g>
          </g>
          <g id="Rectangle 8">
            <use xlinkHref="#path1_fill" transform="translate(1563 -1405.58)" fill="#F8F8F8" />
            <mask id="mask1_outline_ins">
              <use xlinkHref="#path1_fill" fill="white" transform="translate(1563 -1405.58)" />
            </mask>
            <g mask="url(#mask1_outline_ins)">
              <use xlinkHref="#path2_stroke_2x" transform="translate(1563 -1405.58)" fill={props.colour} />
            </g>
          </g>
          <g id="Rectangle 8">
            <use xlinkHref="#path1_fill" transform="translate(1563 -1355.97)" fill="#F8F8F8" />
            <mask id="mask2_outline_ins">
              <use xlinkHref="#path1_fill" fill="white" transform="translate(1563 -1355.97)" />
            </mask>
            <g mask="url(#mask2_outline_ins)">
              <use xlinkHref="#path2_stroke_2x" transform="translate(1563 -1355.97)" fill={props.colour} />
            </g>
          </g>
          <g id="Rectangle 9">
            <use xlinkHref="#path3_fill" transform="translate(1599 -1451.28)" fill="#F8F8F8" />
          </g>
        </g>
      </g>
      <defs>
        <path id="path0_fill" d="M 0 0L 116.603 0C 118.322 0 119.716 1.39391 119.716 3.11338L 119.716 169L 0 169L 0 0Z" />
        <path id="path1_fill" d="M 0 0L 18.5682 0L 18.5682 14.3502L 0 14.3502L 0 0Z" />
        <path id="path2_stroke_2x" d="M 0 0L 0 -4.06919L -4.06919 -4.06919L -4.06919 0L 0 0ZM 18.5682 0L 22.6374 0L 22.6374 -4.06919L 18.5682 -4.06919L 18.5682 0ZM 18.5682 14.3502L 18.5682 18.4194L 22.6374 18.4194L 22.6374 14.3502L 18.5682 14.3502ZM 0 14.3502L -4.06919 14.3502L -4.06919 18.4194L 0 18.4194L 0 14.3502ZM 0 4.06919L 18.5682 4.06919L 18.5682 -4.06919L 0 -4.06919L 0 4.06919ZM 14.499 0L 14.499 14.3502L 22.6374 14.3502L 22.6374 0L 14.499 0ZM 18.5682 10.281L 0 10.281L 0 18.4194L 18.5682 18.4194L 18.5682 10.281ZM 4.06919 14.3502L 4.06919 0L -4.06919 0L -4.06919 14.3502L 4.06919 14.3502Z" />
        <path id="path3_fill" d="M 0 0L 66.2917 0L 66.2917 26.025L 0 26.025L 0 0Z" />
      </defs>
    </svg>
  );
}
