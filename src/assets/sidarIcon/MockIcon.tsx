import React from 'react';

const MockIcon = ({ active = false }: { active: boolean }) => {
  return (
    <svg
      d="1639473812347"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="9620"
      width="30"
      height="30"
      fill={active ? '#FFF' : '#C5CDFE'}
    >
      <path
        d="M896 256l-288 0c-17.696 0-32-14.336-32-32s14.304-32 32-32l288 0c17.696 0 32 14.336 32 32S913.696 256 896 256z"
        p-id="9621"
      />
      <path
        d="M896 416l-288 0c-17.696 0-32-14.336-32-32s14.304-32 32-32l288 0c17.696 0 32 14.336 32 32S913.696 416 896 416z"
        p-id="9622"
      />
      <path
        d="M896 672l-288 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l288 0c17.696 0 32 14.304 32 32S913.696 672 896 672z"
        p-id="9623"
      />
      <path
        d="M896 832l-288 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l288 0c17.696 0 32 14.304 32 32S913.696 832 896 832z"
        p-id="9624"
      />
      <path
        d="M384 480 192 480c-52.928 0-96-43.072-96-96L96 192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 436.928 436.928 480 384 480zM192 160C174.368 160 160 174.368 160 192l0 192c0 17.632 14.368 32 32 32l192 0c17.632 0 32-14.368 32-32L416 192c0-17.632-14.368-32-32-32L192 160z"
        p-id="9625"
      />
      <path
        d="M384 928 192 928c-52.928 0-96-43.072-96-96l0-192c0-52.928 43.072-96 96-96l192 0c52.928 0 96 43.072 96 96l0 192C480 884.928 436.928 928 384 928zM192 608c-17.632 0-32 14.336-32 32l0 192c0 17.664 14.368 32 32 32l192 0c17.632 0 32-14.336 32-32l0-192c0-17.664-14.368-32-32-32L192 608z"
        p-id="9626"
      />
    </svg>
  );
};

export default MockIcon;