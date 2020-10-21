import React from 'react';

import './MyPosts.scss';

const MyPosts = () => {
    return (
        <div>
            <h2 className="heading__tertiary pb-3">My POSTS</h2>
            <div className="my-posts">
                <div className="my-posts__content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam ipsa quo quidem mollitia suscipit reprehenderit blanditiis quasi veritatis vitae unde repudiandae voluptates, natus consequatur totam, ipsam deleniti distinctio aliquam soluta!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repudiandae recusandae voluptatibus facere, esse aperiam delectus quidem, consequuntur fugit voluptate quaerat quas vitae ut voluptates deserunt similique accusamus? In, error.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium deleniti voluptate obcaecati, libero possimus sit illo, labore maiores laboriosam veritatis cum optio exercitationem temporibus deserunt beatae asperiores velit, ullam soluta!
                </div>
                <div className="my-posts__group">
                    <p>
                        Group: <span>Heart</span>
                    </p>
                    <p>
                        Posted on: <span>10 JAnuary,2020</span>
                    </p>
                    <p>
                        Comments: <span>10</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;