/**
 * @license Copyright 2021 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import {FunctionComponent} from 'preact';
import {FlowStepIcon} from '../common';
import {classNames, useCurrentLhr, useDerivedStepNames, useFlowResult} from '../util';

const SidebarFlowStep: FunctionComponent<{
  mode: LH.Result.GatherMode,
  href: string,
  label: string,
  isCurrent: boolean,
}> = ({href, label, mode, isCurrent}) => {
  return (
    <a
      className={classNames('SidebarFlowStep', {'Sidebar--current': isCurrent})}
      href={href}
    >
      <div>
        <FlowStepIcon mode={mode}/>
      </div>
      <div className={`SidebarFlowStep__label SidebarFlowStep__label--${mode}`}>{label}</div>
    </a>
  );
};

export const SidebarFlow: FunctionComponent = () => {
  const flowResult = useFlowResult();
  const currentLhr = useCurrentLhr();
  const stepNames = useDerivedStepNames();

  return (
    <div className="SidebarFlow">
      {
        flowResult.lhrs.map((lhr, index) => {
          const stepName = stepNames[index];
          const url = new URL(location.href);
          url.hash = `#index=${index}`;
          return (
            <SidebarFlowStep
              key={lhr.fetchTime}
              mode={lhr.gatherMode}
              href={url.href}
              label={stepName}
              isCurrent={index === (currentLhr && currentLhr.index)}
            />
          );
        })
      }
    </div>
  );
};
