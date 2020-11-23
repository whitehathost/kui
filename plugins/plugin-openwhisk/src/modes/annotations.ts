/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { i18n } from '@kui-shell/core'
import { WithAnnotations, hasAnnotations } from '../models/resource'

const strings = i18n('plugin-openwhisk')

/**
 * The Annotations mode applies to all Action resources.
 *
 */
export default {
  when: hasAnnotations,
  mode: {
    mode: 'annotations',
    label: strings('Annotations'),

    content: async (_, resource: WithAnnotations) => {
      const { safeDump } = await import('js-yaml')
      return {
        content: safeDump(
          resource.annotations.reduce((M, a) => {
            M[a.key] = a.value
            return M
          }, {})
        ),
        contentType: 'yaml'
      }
    }
  }
}