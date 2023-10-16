import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coyWithoutShadows } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

class DisplayMarkDown extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <ReactMarkdown
                    children={this.props.article}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                            <SyntaxHighlighter
                                showLineNumbers={ true }
                                children={String(children).replace(/\n$/, '')}
                                style={ coyWithoutShadows }
                                language={match[1]}
                                PreTag="div"
                                tabIndex={0}
                                {...props}
                            />
                            ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                            )
                        }
                    }}
                />
            </React.Fragment>
        );
    }
}
 
export default DisplayMarkDown;