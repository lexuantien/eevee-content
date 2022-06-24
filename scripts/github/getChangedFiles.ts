// try to keep this dep-free so we don't have to install deps

import { execSync } from 'child_process';
import { compileMdx } from '../mdx/index';
import { ChangedFile, Change } from './getChangedFiles.types';
import { createCollection } from '../firestore/init';
import { setDoc, doc } from 'firebase/firestore';
import type { Post } from '../../typings/my-mdx';

const postCol = createCollection<Post>('posts');

/**
 * @param {*} currentCommitSha default `HEAD^`
 * @param {*} compareCommitSha default `HEAD`
 * @returns
 */
async function getChangedFiles(currentCommitSha: string = 'HEAD^', compareCommitSha: string = 'HEAD') {
  try {
    const lineParser = /^(?<change>\w).*?\s+(?<filename>.+$)/;
    const gitOutput = execSync(`git diff --name-status ${currentCommitSha} ${compareCommitSha}`).toString();
    // const gitOutput = execSync(`git diff-tree --no-commit-id --name-status -r  735ce1b 504a137  `).toString();
    const changedFiles = gitOutput
      .split('\n')
      .map(line => line.match(lineParser)?.groups)
      .filter(Boolean);
    const changes: ChangedFile[] = [];
    for (const { change, filename } of changedFiles) {
      // const changeType = changeTypes[change];
      const changeType = change as Change;
      if (changeType) {
        // changes.push({ changeType: changeTypes[change], filename });
        changes.push({ changeType, filename });
      } else {
        console.error(`Unknown change type: ${change} ${filename}`);
      }
    }
    return changes;
  } catch (error) {
    console.error(`Something went wrong trying to get changed files.`, error);
    return null;
  }
}

async function go() {
  const changedFiles = (await getChangedFiles()) ?? [];
  const contentPaths = changedFiles
    .filter(f => f.filename.startsWith('content'))
    .map(f => {
      f.filename = f.filename.replace(/^content\//, '');
      return f;
    });
  if (contentPaths.length) {
    console.log(`⚡️ Content changed. Requesting the cache be refreshed.`, {
      contentPaths,
    });

    contentPaths.forEach(element => {
      if (element.changeType && element.changeType != 'D') postMdxPost(element);
    });

    console.log(`Content change request finished.`);
  } else {
    console.log('🆗 Not refreshing changed content because no content changed.');
  }
}

async function postMdxPost(content: ChangedFile) {
  const result = await compileMdx(content.filename);
  const { categories, description, meta, title, id } = result.frontmatter;

  // generate id for new mdx post
  // asume every thing true, no bug
  // improve later
  if (!id) {
    throw Error('id is require, please undo id');
  } else if (categories.length === 0) {
    throw Error('category must define');
  } else if (!description) {
    throw Error('description must define');
  } else if (!meta.keywords) {
    throw Error('meta.keywords must define');
  } else if (!title) {
    throw Error('title must define');
  }
  //  push to firestore
  const postDocRef = doc(postCol, `${id}`);

  await setDoc(
    postDocRef,
    {
      code: result.code,
      frontmatter: result.frontmatter,
      readTime: result.readTime,
    },
    { merge: true },
  );
}

go();
